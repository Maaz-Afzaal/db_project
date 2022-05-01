const baseUrl="http://localhost:8000"
export const getData=async (path,method,body)=>{
	
	try {
		let headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
        };;
		
		let obj=method=="GET"?{method: `${method}`,
        headers: headers}:{
            method: `${method}`,
			headers: headers,
            body: JSON.stringify(body)
        }
		const response = await fetch(`${baseUrl}${path}`, obj);
		const json = await response.json();
		if(response.ok){
			return {result:json};
		}
	
		return {error:json};
	} catch (error) {
		return {error,};
	}
};