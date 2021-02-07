import { NavBar } from "../components/NavBar";
import { usePostsQuery } from "../generated/graphql";


const Index = () => {
    const [{data}] = usePostsQuery();
    return (
        <>
            <NavBar/>
            <div>hello</div>
            <br/>
            {!data?<div>...loading</div>: data.posts.map(p=>{
                key={p.id},
                
            }) }
            
        </>
    )
}

export default Index
