// Datos de autenticación

// URL de la imagen del fantasma
const ghostImageUrl = 'https://media.discordapp.net/attachments/1212954682537021490/1214659629024546857/Ghost_01.png?ex=65f9eaee&is=65e775ee&hm=c6ec1383ebfc0788ed3204e6150393d61eb82d47b70d0e047a1240a001e78b27&=&format=webp&quality=lossless';

// Función para obtener la información de los usuarios conectados al canal
async function getUsersInChannel() {
    const response = await fetch(`https://api.twitch.tv/helix/users?login=${channelName}`, {
        headers: {
            'Client-ID': clientId,
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data.data;
}

// Función para agregar un fantasma en una posición aleatoria
function addGhost(user) {
    const ghost = document.createElement('img');
    ghost.src = ghostImageUrl;
    ghost.classList.add('ghost');
    ghost.style.left = Math.random() * 1280 + 'px'; // Posición X aleatoria
    ghost.style.top = Math.random() * 720 + 'px'; // Posición Y aleatoria

    const username = document.createElement('p');
    username.textContent = user.display_name;
    username.style.position = 'absolute';
    username.style.top = (parseFloat(ghost.style.top) + 50) + 'px'; // Colocar debajo del fantasma
    username.style.left = ghost.style.left;
    
    document.getElementById('app').appendChild(ghost);
    document.getElementById('app').appendChild(username);
}

// Función principal
async function main() {
    const users = await getUsersInChannel();
    users.forEach(user => {
        addGhost(user);
    });
}

// Ejecutar la función principal al cargar la página
main();
