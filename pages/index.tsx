import Image from 'next/image'
import { Inter } from 'next/font/google'
import Dashboard  from '../components/Dashboard'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <div className="flex flex-col items-center justify-center px-4 py-2">
            <h1 className="text-4xl md:text-6xl font-bold">
                HeartButton
                <span className="text-4xl md:text-6xl font-bold text-yellow-600">
              : 10x bonding with AI
            </span>
            </h1>
            <p className="mt-3 text-2xl">
                deep
                <span className="text-2xl font-bold text-yellow-600">
              {" "}
                    Ice Breaker{" "}
            </span>
                game
            </p>
        </div>
        <Dashboard/>

    </main>
  )
}
