import { createClient, dedupExchange, fetchExchange } from 'urql'
import { cacheExchange } from '@urql/exchange-graphcache'
import { LogoutMutation, MeQuery, MeDocument, LoginMutation, RegisterMutation } from '../generated/graphql'
import { bringExchange } from './bringExchange'

export const createUrqlClient = (ssrExchange:any) => {

  const client = createClient({
        url: 'http://localhost:4000/graphql',
        fetchOptions:{
            credentials:"include"
        },
        exchanges: [dedupExchange, cacheExchange({
            updates:{
            Mutation:{
                logout:(_result,args, cache, info)=>{
                bringExchange<LogoutMutation,MeQuery>(
                    cache,
                    {query:MeDocument},
                    _result,
                    ()=>{
                    return{
                        me:null
                    }
                    }
                )
                },
                login:(_result,args, cache, info)=>{
                bringExchange<LoginMutation,MeQuery>(cache,{query:MeDocument},_result,
                    (result,query)=>{
                    if (result.login.errors){
                        return query;
                    }else{
                        return{
                        me:result.login.user
                        }
                    }
                })
                },
                register:(_result,args, cache, info)=>{
                bringExchange<RegisterMutation,MeQuery>(cache,{query:MeDocument},_result,
                    (result,query)=>{
                    if (result.register.errors){
                        return query;
                    }else{
                        return{
                        me:result.register.user
                        }
                    }
                })
                },
            }
            }
            
        }),
        ssrExchange,
        fetchExchange],

    })

}
