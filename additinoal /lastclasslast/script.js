document.addEventListener('DOMContentLoaded', () => {
    const postcard = document.getElementById('postcard');
    const postcardImage = document.getElementById('postcard-image');
    const postcardMessage = document.getElementById('postcard-message');
    
    const borderControl = document.getElementById('border-control');
    const imageControls = document.querySelectorAll('input[name="image"]');
    const layoutControl = document.getElementById('layout-control');
    const fontControl = document.getElementById('font-control');
    const colorBtns = document.querySelectorAll('.color-btn');
    const messageInput = document.getElementById('message-input');


    borderControl.addEventListener('change', (e) => {
        postcard.classList.remove('border-all', 'border-top-bottom', 'border-left-right', 'border-none');
        postcard.classList.add(`border-${e.target.value}`);
    });

    imageControls.forEach(input => {
        input.addEventListener('change', (e) => {
            if (e.target.checked) {
                postcardImage.src = e.target.value;
            }
        });
    });

    layoutControl.addEventListener('change', (e) => {
        postcard.classList.remove('layout-1', 'layout-2', 'layout-3');
        postcard.classList.add(e.target.value);
    });

    fontControl.addEventListener('change', (e) => {
        postcardMessage.style.fontFamily = e.target.value;
    });
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            const color = btn.getAttribute('data-color');
            postcardMessage.style.color = color;
        });
    });

    messageInput.addEventListener('input', (e) => {
        postcardMessage.textContent = e.target.value;
    });
});
