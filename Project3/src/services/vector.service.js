
const { Pinecone } =  require('@pinecone-database/pinecone')

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

// Create a dense index with integrated embedding

const ChatgptCloneIndex = pc.Index('chatgpt-clone');


async function createVectorMemory({vector,messageId,metadata}){
    await ChatgptCloneIndex.upsert([{
        id:messageId,
        values:vector,
        metadata:metadata
    }])
}


async function queryMemory({queryVecotr, limit = 5 ,metadata}){
    const data = await ChatgptCloneIndex.query({
        vectoer:queryVecotr,
        topK:limit,
        includeMetadata:true,
        filter:metadata ? {metadata} : undefined
    })

    return data.matches;
}


module.exports = {
    createVectorMemory,
    queryMemory
}