export function validateName(e) {
    if (!e.target.ownerFullName.value.trim()) {
        alert('Введите ФИО клиента')
        return false
    }
    return true
}

export function validateResolution(e) {
    if (!e.target.resolution.value.trim()  && e.target.status.value === 'done') {
        alert('Введите завершающий комментарий')
        return false
    }
    return true
}

export function validatePassword (e) {
    if (e.target.password.value.length > 12 || e.target.password.value.length < 3) {
        alert('Пароль должен содержать от 3 до 12 символов')
        return false
    }
    return true
}