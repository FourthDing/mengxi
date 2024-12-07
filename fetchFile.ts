export async function fetchFile(dest:string):Promise<Blob | null>{//从服务器要东西
    var response = await fetch(dest);
    if (response.ok){
        var raw = response.blob();
        return raw;
    }
    return null;
}