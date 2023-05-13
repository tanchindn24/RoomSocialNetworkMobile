import axios from "axios";

function getPosts() {
    axios.get('http://127.0.0.1:8000/api/posts')
        .then((response) => {
            return response
        }).catch((error) => {
            console.log(error)
    })
}
export default getPosts
