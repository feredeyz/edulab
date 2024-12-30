import Header from "./Header";
import '../styles/Courses.css';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


export default function Courses() {
    const navigate = useNavigate();
    const user = Cookies.get("user_data");

    const addCourse = () => {
        if (user) {
            navigate("/add-course");
        } else {
            navigate('/registration')
        }
    }

    return (
        <>
            <Header />
            <div className="courses">
                <div className="my-courses">
                    <h1>My courses</h1>
                    <ul>

                    </ul>
                </div>
                <div className="popular-courses">
                    <h1>Popular</h1>
                    <ul>

                    </ul>
                </div>
            </div>

            <div>
                <button onClick={addCourse} className="add-course-button">+</button>
            </div>
        </>
    )
}