import { Link } from "react-router-dom";

export function ErrorPage() {
    return(
        <div className="text-lg w-full min-h-screen flex flex-col items-center justify-center text-amber-50">
            <h1 className="font-bold text-4xl mb-3.5">Página não encontrada</h1>
            <p className="italic">Você caiu em uma página que não existe!</p>
            <Link className="border mt-6 p-2.5 rounded-lg bg-blue-600" to='/'>Voltar para a home</Link>
        </div>
    )
}