// useGlobalProvider.js
import { useContext } from 'react';
import { GlobalContext } from '../context/globalContext';

const useGlobalProvider = () => {
    return useContext(GlobalContext);
}

export default useGlobalProvider;
