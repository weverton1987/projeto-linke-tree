import { Header } from "../../components/Header";
import { Input } from '../../components/Input/index';
import { useEffect, useState, type FormEvent } from "react";
import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";

interface LinkProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin() {
    const [nameInput, setNameInput] = useState('')
    const [url, setUrl] = useState('')
    const [textColorInput, setTextColorInput] = useState('#f1f1f1')
    const [bgColorInput, setBgColorInput] = useState('#121212')
    const [links, setLinks] = useState<LinkProps[]>([])

    useEffect(() => {
        const linksRef = collection(db, 'links');
        const queryRef = query(linksRef, orderBy('created', 'asc'));
        const unsub = onSnapshot(queryRef, snapshot => {
            const lista = [] as LinkProps[];
            snapshot.forEach(doc => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })
            setLinks(lista)
        })
        return () => {
            unsub()
        }

    }, [])

    async function handleDeleteLink(id: string) {
        const docRef = doc(db, 'links', id)
        await deleteDoc(docRef)
    }

    function handleRegister(e: FormEvent) {
        e.preventDefault()
        if (nameInput === '' || url === '') {
            alert('Preencha todos os campos')
            return;
        }

        addDoc(collection(db, 'links'), {
            name: nameInput,
            url: url,
            bg: bgColorInput,
            color: textColorInput,
            created: new Date()
        })
            .then(() => {
                setNameInput('')
                setUrl('')
                alert('cadastrado com sucesso')
            })
            .catch((error) => {
                alert(`Erro ao cadastrar no banco ${error}`)
            })
    }

    return (
        <div className="flex items-center min-h-screen flex-col pb-7 px-2">
            <Header />

            <form onSubmit={handleRegister} className="flex flex-col mt-8 mb-3 w-full max-w-xl">
                <label className="text-white font-medium mt-2 mb-2 flex justify-center">Nome do link</label>
                <Input type="text" placeholder="Digite o nome do link..." value={nameInput} onChange={e => setNameInput(e.target.value)} />

                <label className="text-white font-medium mt-2 mb-2 flex justify-center">Url do link</label>
                <Input type="url" placeholder="Digite a url do link..." value={url} onChange={e => setUrl(e.target.value)} />

                <section className="flex my-4 gap-5">
                    <div className="flex gap-4">
                        <label className="text-white font-medium mt-2 mb-2 ">cor do link</label>
                        <input className="w-11 h-11" type="color" value={textColorInput} onChange={e => setTextColorInput(e.target.value)} />
                    </div>
                    <div className="flex gap-4">
                        <label className="text-white font-medium mt-2 mb-2 ">Fundo do link</label>
                        <input className="w-11 h-11" type="color" value={bgColorInput} onChange={e => setBgColorInput(e.target.value)} />
                    </div>
                </section>
                {nameInput !== '' && (
                    <div className="flex flex-col items-center rounded-md mb-7 p-1 border border-gray-100/25">
                        <label className="text-white font-medium mt-2 mb-3 ">Veja como está ficando:</label>
                        <article className="w-11/12 max-w-lg flex rounded px-1 py-3 bg-zinc-900 flex-col items-center justify-between"
                            style={{ marginBottom: 8, marginTop: 8, backgroundColor: bgColorInput }}>
                            <p className="font-medium" style={{ color: textColorInput }}>{nameInput}</p>
                        </article>
                    </div>
                )}
                <button type="submit" className="bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center mb-7">
                    Cadastrar
                </button>
            </form>
            <h2 className="text-white font-bold text-2xl mb-4">Meus links</h2>
            {links.map(item => (
                <article key={item.id} style={{ backgroundColor: item.bg, color: item.color }} className="flex items-center justify-between w-11/12 max-w-xl h-9 py-3 px-2 rounded-md select-none">
                    <p>{item.name}</p>
                    <div>
                        <button onClick={() => handleDeleteLink(item.id)} className="border border-dashed p-1 rounded bg-black">
                            <FiTrash size={18} color="#fff" />
                        </button>
                    </div>
                </article>
            ))}
        </div>
    )
}