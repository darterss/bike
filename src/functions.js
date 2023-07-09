export function validateName(e) {
    if (!e.target.ownerFullName.value.trim()) {
        alert('введите ФИО клиента')
        return false
    }
    return true
}