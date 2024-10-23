import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Banner} from "../lib/main.ts";
import {useNonce, getShopAnalytics, Analytics} from '@shopify/hydrogen';

function App() {
    const [count, setCount] = useState(0)

    return (
        <Analytics.Provider cart={null} consent={{
            checkoutDomain: 'thangnd-headless.myshopify.com',
            storefrontAccessToken: '40f2ca97fd1bfab0e143f9e62c2a94fa',
            withPrivacyBanner: true,
            country: 'VN',
            language: 'VI',
        }} shop={{
            shopId: '61629595718',
            acceptedLanguage: 'VI',
            currency: 'VND',
            hydrogenSubchannelId: '0'
        }}>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <Banner/>
        </Analytics.Provider>
    )
}

export default App
