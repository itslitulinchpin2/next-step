"use client"
import { useRouter } from "next/navigation";

export default function Create(){
    const router=useRouter();
    return(
        <form onSubmit={(event)=>{
            event.preventDefault();
            const title=event.target.title.value;
            const body=event.target.body.value;
            const options = {
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({title,body})
            }
            fetch(process.env.NEXT_PUBLIC_API_URL+`topics`,options)
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
                const lastId = result.id;
                router.refresh()// 서버 컴포넌트를 강제로 다시 랜더링 하도록 하는 기능
                router.push(`/read/${lastId}`)
            })
        }}>
            <p>
                <input type="text" name="title" placeholder="title"></input>
            </p>
            <p>
                <textarea  name="body" placeholder="body"></textarea>
            </p>
            <p>
                <input type="submit" value="create"></input>
            </p>
        
        </form>
    )
}