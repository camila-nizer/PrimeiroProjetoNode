const usuarios=[]

const getUser = (req,res) => {
    console.log("Entrou no Get")
    res.send(usuarios)
}

const postUser = (req, res) => {
    console.log("Entrou no Post",req.body)
    const dadosUsuario = {
        'nome': req.body.nome,
        'cpf': req.body.cpf,
        'telefone': req.body.telefone,
        'email': req.body.email,
    }

    let messageError
    let userHasError=false

    if(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(req.body.cpf)==false){
        userHasError=true
        messageError = "CPF inválido"
    } else if(/^\(\d{2}\)\d{5}\-\d{4}$/.test(req.body.telefone)==false ){
        userHasError=true
        messageError = "Telefone inválido"
    }else if( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(req.body.email)==false){
        userHasError=true
        messageError = "E-mail inválido"
    }
    else{
        for(i=0; i<usuarios.length; i++){
            if(usuarios[i].cpf == req.body.cpf){
                userHasError=true
                messageError = "CPF já cadastrado"
            }
        }                    
    }

    if(userHasError==false){
        usuarios.push(dadosUsuario)
        res.status(200).send(dadosUsuario)
    }else{
        res.status(400).send(messageError) 
    }

    
}

const putUser= (req, res) =>{
    console.log("Entrou no Editar",req.body)

    let messageErrorPut
    let userHasErrorPut=false

    if(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(req.body.cpf)==false){
        userHasErrorPut=true
        messageErrorPut = "CPF inválido"
    }
    else{
        const dadosUsuarioToEdit = {
            'nome': req.body.nome,
            'cpf': req.body.cpf,
            'telefone': req.body.telefone,
            'email': req.body.email,
        }
        let cpftoPutExists=false
        let numberIndexToEdit
        for(let j=0; j<usuarios.length; j++){
            if(usuarios[j].cpf == req.body.cpf){
                cpftoPutExists=true
                numberIndexToEdit= j
            }

        }
        if(cpftoPutExists==false){
            userHasErrorPut=true
            messageErrorPut = "CPF inexistente"
        }
        else{
            usuarios[numberIndexToEdit]=dadosUsuarioToEdit
        }                  
    }

    if(userHasErrorPut==false){
        res.status(200).send("Usuário editado com sucesso.")

        
    }else{
        
        res.status(400).send(messageErrorPut) 
    }
}

const deleteUser = (req, res) => {
    console.log("Entrou no Delete",req.body)

    let messageErrorDelete
    let userHasErrorDelete=false

    if(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(req.body.cpf)==false){
        userHasErrorDelete=true
        messageErrorDelete = "CPF inválido"
    }
    else{
        let cpftoDeleteExists=false
        let numberIndexToDelete
        for(let j=0; j<usuarios.length; j++){
            if(usuarios[j].cpf == req.body.cpf){
                cpftoDeleteExists=true
                numberIndexToDelete= j
            }

        }
        if(cpftoDeleteExists==false){
            userHasErrorDelete=true
            messageErrorDelete = "CPF inexistente"
        }
        else{
            usuarios.splice(usuarios.indexOf(numberIndexToDelete),1)
        }                  
    }

    if(userHasErrorDelete==false){
        res.status(200).send("Usuário deletado com sucesso.")
        
    }else{
        
        res.status(400).send(messageErrorDelete) 
    }
    
}

module.exports = {
    "getUser": getUser,
    "postUser": postUser,
    "deleteUser": deleteUser,
    "putUser": putUser,
}