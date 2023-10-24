"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect,useState } from "react";
export default function Update(){
    const params = useParams();
    const router=useRouter();
    const id = params.id;
    const [title,setTitle]=useState();
    const [body,setBody]=useState();
    useEffect(()=>{
        fetch(process.env.NEXT_PUBLIC_API_URL+`topics/${id}`)
        .then(resp=>resp.json())
        .then(result=>{
            setTitle(result.title);
            setBody(result.body);
        })
    },[])
    return(
        <form onSubmit={(event)=>{
            event.preventDefault();
            const title=event.target.title.value;
            const body=event.target.body.value;
            const options = {
                method:'PATCH',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({title,body})
            }
            fetch(`http://localhost:9999/topics/${id}`,options)
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
                const lastId = result.id;
                router.refresh()// 서버 컴포넌트를 강제로 다시 랜더링 하도록 하는 기능
                router.push(`/read/${lastId}`)
            })
        }}>
            <p>
                <input type="text" name="title" value={title} placeholder="title"
                onChange={(e)=>{
                    setTitle(e.target.value)
                }}></input>
            </p>
            <p>
                <textarea  name="body" value={body} placeholder="body"
                onChange={(e)=>{
                    setBody(e.target.value);
                }}></textarea>
            </p>
            <p>
                <input type="submit" value="update"></input>
            </p>
        
        </form>
    )
}