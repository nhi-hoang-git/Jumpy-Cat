const cat = document.querySelector('.cat');
const obstacle = document.querySelector('.obstacle');
let isJumping = false;
let gravity = 0.9;

// initial position of cat
cat.style.right = '600px';

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});

function jump() {
    if (isJumping) return;
    let position = parseInt(cat.style.bottom) || 0;
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);

            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                    position = 0;
                }
                position -= 5;
                position = position * gravity;
                cat.style.bottom = position + 'px';
            }, 20);
        }
        position += 20;
        position = position * gravity;
        cat.style.bottom = position + 'px';
    }, 20);
}



function checkCollision() {
    const catRect = cat.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        catRect.right > obstacleRect.left &&
        catRect.left < obstacleRect.right &&
        catRect.bottom > obstacleRect.top &&
        catRect.top < obstacleRect.bottom
    ) {
        alert('Game Over');
        document.location.reload();
    }
}

setInterval(checkCollision, 10);