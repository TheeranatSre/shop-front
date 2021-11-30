import React from 'react';
import Routing from './routes/routes'
// import '../src/public/static/css/font-face-icon.css'
// import '../src/public/static/css/font-awesome.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

function App() {
  library.add(fab, faCheckSquare, faCoffee)
  return (
      <Routing isSignedIn={true}/>
  );
}

export default App;
