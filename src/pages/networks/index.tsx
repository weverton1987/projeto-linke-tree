import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useEffect, useState, type FormEvent } from "react";
import { db } from "../../services/firebaseConnection";
import { doc, setDoc, getDoc } from "firebase/firestore";

export function Networks() {
    const [facebook,setFacebook] = useState('')
    const [instagram,setInstagram] = useState('')
    const [youtube,setYoutube] = useState('')

    useEffect(() => {
        function loadLinks() {
            const docRef = doc(db, 'social', 'link')
            getDoc(docRef)
            .then(snapshot => {
                if(snapshot.data() !== undefined){
                    setFacebook(snapshot.data()?.facebook)
                    setInstagram(snapshot.data()?.instagram)
                    setYoutube(snapshot.data()?.youtube)
                }
            })
        }
        loadLinks()
    },[])

    function handleRegister(e:FormEvent) {
        e.preventDefault()

        setDoc(doc(db, 'social', 'link'), {
            facebook:facebook,
            instagram:instagram,
            youtube:youtube
        })
        .then(() => {
            alert('Cadstrado com sucesso')
        })
        .catch(error => {
            alert(`Erro ao cadastrar ${error}`)
        })
    }

    return (
        <div className="pb-7 px-7 min-h-screen flex flex-col items-center">
            <Header />
            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>
            <form onSubmit={handleRegister} className="flex flex-col max-w-xl w-full">
                <label className="text-white font-medium flex justify-center mt-2 mb-3">Link do facebook</label>
                <Input value={facebook} onChange={e => setFacebook(e.target.value)} type="url" placeholder="Digite a url do facebook..."/>
                <label className="text-white font-medium flex justify-center mt-2 mb-3">Link do instagram</label>
                <Input value={instagram} onChange={e => setInstagram(e.target.value)} type="url" placeholder="Digite a url do instagram..."/>
                <label className="text-white font-medium flex justify-center mt-2 mb-3">Link do youtube</label>
                <Input value={youtube} onChange={e => setYoutube(e.target.value)} type="url" placeholder="Digite a url do youtube..."/>
                <button type="submit" className="font-medium text-white border-0 h-9 rounded-md outline-none px-2 mb-3 mt-9 bg-blue-600">
                    Salvar links
                </button>
            </form>
        </div>
    )
}