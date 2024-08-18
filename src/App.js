import logo from './logo.svg';
import './App.css';
import { Input, Quick } from './components'
import images from './assets/images' 

function App() {

  return (
    <div className="h-screen flex flex-row bg-[#333333]">
      <div className="w-1/4 border-r border-light h-full"></div>
      <Input onChange={(event) => console.log(event.value)} className="w-full h-11 p-2 bg-gray-900" iconClassName="ps-2 w-8 h-8" icon={images.search}
        inputClassName="text-[#FFF] bg-transparent border-transparent w-full ms-2" />
      <div className="absolute right-8 bottom-8 ">
        <Quick />
      </div>
    </div>
  );
}

export default App;
