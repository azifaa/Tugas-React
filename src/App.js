import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Dashboard from './page/dashboard';
import Tentang from './page/tentang';
import Siswa from './page/siswa';
import Tambah from './crud/tambah';
import Edit from './crud/edit';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <main>
          <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/tentang" component={Tentang} exact />
            <Route path="/siswa" component={Siswa} exact />
            <Route path="/tambah" component={Tambah} exact />
            <Route path="/edit/:id" component={Edit} exact />
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;