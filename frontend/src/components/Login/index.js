import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import shiftLogo from "../images/shiftLogo.jpg";
import {UserLogIn} from "redux/reducers/LoginSlice";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import {useForm, Controller} from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import {CgSpinner} from "react-icons/cg";
import instance from "../utils/config/instance";

function Index() {
    const {isLoading, error} = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: {errors}
    } = useForm();
    useEffect(() => {
        async function check() {
            const res = await instance("/api/v1/security", "GET");
            if (!res.error) {
                navigate("/dashboard")
            }
        }

        check()
    }, [])
    const loginUser = (formData) => {
        if (formData.phone.startsWith("+998")) {
            if (formData.phone.length === 13) {
                if (formData.password.length >= 8) {
                    dispatch(UserLogIn({formData, navigate}));
                } else {
                    toast.error(
                        "Password should be at least 8 characters long for secure"
                    );
                }
            } else {
                toast.error("Phone number must be 13 digits like +998 XX XXX-XX-XX");
            }
        } else {
            toast.error("Please choose Uzbekistan");
        }
    };
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);
    useEffect(() => {
        async function check() {
            const res = await instance("/api/v1/security", "GET");
            if (!res.error) {
                navigate("/dashboard")
            }
        }
        check()
    }, [])
    return (
        <div className='Father-Login'>
            <ToastContainer/>
            <div className='Login-box'>
                <div>
                    <img
                        className='shiftLogo'
                        src={shiftLogo}
                        width={100}
                        height={100}
                        alt=''
                    />
                </div>
                <div className='body'>
                    <div>
                        <p className='information'>
                            We improve the process-your distribution
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(loginUser)}>
                        <div>
                            <Controller
                                name='phone'
                                control={control}
                                defaultValue='+998'
                                rules={{required: "Phone Number is required"}}
                                render={({field}) => (
                                    <div className='my-3 '>
                                        <PhoneInput
                                            {...field}
                                            defaultCountry='UZ'
                                            limitMaxLength={true}
                                            placeholder='+998'
                                        />
                                        {errors.phone && (
                                            <p className='error-message'>{errors.phone.message}!</p>
                                        )}
                                    </div>
                                )}
                            />

                            <Controller
                                name='password'
                                control={control}
                                defaultValue=''
                                rules={{required: "Password is required"}}
                                render={({field}) => (
                                    <div className='my-3 d-flex input-group align-items-center'>
                                        <input
                                            {...field}
                                            placeholder='Password'
                                            type={showPassword ? 'text' : 'password'}
                                            className='form-control my-1'
                                        />
                                        <button
                                            className='btn btn-outline-secondary h-75'
                                            type='button'
                                            onClick={handleTogglePassword}
                                        >
                                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                        </button>
                                        {errors.password && (
                                            <p className='error-message'>
                                                {errors.password.message}!
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                            <div>
                                <p className='information'>Shift Academy</p>
                            </div>

                            <div className='d-flex justify-content-start align-items-center my-2'>
                                <label className='ml-2'>
                                    <Controller
                                        name='rememberMe'
                                        control={control}
                                        defaultValue={false}
                                        render={({field}) => (
                                            <>
                                                <input {...field} type='checkbox'/>
                                                Remember me
                                            </>
                                        )}
                                    />
                                </label>
                            </div>

                            <button
                                className='w-100 btn btn-lg btn btn-success mt-2'
                                type='submit'
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <CgSpinner className='animate-spin' size={30}/>
                                ) : (
                                    "Login"
                                )}
                            </button>
                            <hr/>
                            <div className='Support-service'>
                                <p>Support service: +998 94 121-00-41</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Index;
