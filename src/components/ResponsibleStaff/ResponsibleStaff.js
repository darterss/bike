import BackButton from "../BackButton";
import {connect} from "react-redux";
import axios from "axios";
function ResponsibleStaff(props) {
    console.log(`Bearer ${props.token}`)
    /*fetch('https://sf-final-project-be.herokuapp.com/api/officers/',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer${props.token}`
        }
    })*/
    /*const staff = axios.get(`https://sf-final-project-be.herokuapp.com/api/officers/?Authorization=Bearer ${props.token}`).then(res => console.log(res))
    console.log(staff)*/
    const staff = axios(`https://sf-final-project-be.herokuapp.com/api/officers/`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODhjZTVlMTVmZjFmZmMzZmZiYzE0ZCIsImlhdCI6MTY4Njc3MDc1MywiZXhwIjoxNjg3Mzc1NTUzfQ.10wZw0Eb7t9lnygNg0KoyYNFEgeQ_AoaBdPLnU75Mj0'
        }}).then(res => console.log(res))
    console.log(staff)
    return (
        <>
            <h2>Ответственные сотрудники</h2>

            <BackButton />
        </>
    )
}
const mapStateToProps = state => ({
    token: state.posts.token
})
export default connect (mapStateToProps)(ResponsibleStaff)