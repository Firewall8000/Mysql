const apiUrl = "http://localhost:3000/usuarios";

document.getElementById("userForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;

    if (id) {
        await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, telefone })
        });
    } else {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, telefone })
        });
    }

    document.getElementById("userForm").reset();
    carregarUsuarios();
});

// Função para carregar usuários
async function carregarUsuarios() {
    const response = await fetch(apiUrl);
    const usuarios = await response.json();

    const userList = document.getElementById("userList");
    userList.innerHTML = "";
    usuarios.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = `${user.nome} - ${user.email} - ${user.telefone} 
            <button onclick="editarUsuario(${user.id}, '${user.nome}', '${user.email}', '${user.telefone}')">Editar</button>
            <button onclick="deletarUsuario(${user.id})">Excluir</button>`;
        userList.appendChild(li);
    });
}

// Função para editar usuário
function editarUsuario(id, nome, email, telefone) {
    document.getElementById("id").value = id;
    document.getElementById("nome").value = nome;
    document.getElementById("email").value = email;
    document.getElementById("telefone").value = telefone;
}

// Função para deletar usuário
async function deletarUsuario(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    carregarUsuarios();
}

carregarUsuarios();
