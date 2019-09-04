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
	saveData: async (keyName, payload) => {
		try {
			const data = await localforage.setItem(keyName, payload);
			return data;
		} catch(e) {
			console.log(e);
			return e;
		}
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