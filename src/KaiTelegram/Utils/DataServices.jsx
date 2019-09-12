import localforage from "localforage";

const DataServices = {
	getData: async (keyName) => {
		try {
			const data = await localforage.getItem(keyName);
			return data;
		} catch(e) {
			console.log(e);
			return e;
		}
	},
	saveData:  (keyName, payload) => {
			localforage.setItem(keyName, payload).catch(e => console.log(e));
	},
	deleteData: async (keyName) => {
		try {
			const data = await localforage.removeItem(keyName);
			return data;
		} catch(e) {
			console.log(e);
			return e;
		}
	},
}

export default DataServices;