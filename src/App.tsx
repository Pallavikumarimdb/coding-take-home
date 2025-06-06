import Header from './components/Header';
import SearchSection from './components/SearchSection';
import CountrySection from './components/CountrySection';
import MissingDataSection from './components/MissingDataSection';

function App() {
  return (
    <>
      <div className="min-h-screen bg-[#dcdbe2]">
      <Header />
      
      <main className="py-8">
        <SearchSection />
        <CountrySection />
        <MissingDataSection />
      </main>
      
      <footer className="border-t border-gray-400 px-4 py-8 pt-24 text-center text-sm text-blue-800">
        <p>© 2025 DataDashboard.</p>
      </footer>
    </div>
    </>
  )
}

export default App
