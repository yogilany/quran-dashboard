import '@/styles/globals.css'
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import Provider from '@/components/Provider';

export const metadata = {
    title: "قرآن داشبورد",
    description: "لحفظ أيسر",
    themeColor: "#242424",
}


const RootLayout = ({children}) => {
  return (
    <html lang="ar">
        <head>
        <link rel="shortcut icon" href="/assets/icons/favicon.ico" />
      </head>
        <body>
<Provider>
            <div className='main'>
                <div className='gradient'>

                </div>
            </div>

            <main className='app'>
                <Nav />
                {children}
                <Footer />

            </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout 