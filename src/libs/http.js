class Http {
    static _instance = null;

    static getInstance = () => {
        if (Http._instance === null) {
            Http._instance = new Http();

            return Http._instance;
        }

        return Http._instance;
    };

    get = async (url) => {
        try {
            let request = await fetch(url);
            let json = await request.json();

            return json;
        } catch (error) {
            console.log('http get method error', error);
            throw Error(error);
        }
    };

    post = async (url, body) => {
        try {
            let request = await fetch(url, {
                method: 'POST',
                body,
            });

            let json = await request.json();

            return json;
        } catch (error) {
            console.log('http post method error', error);
            throw Error(error);
        }
    };
}

export default Http;
