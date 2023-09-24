import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {UserLogIn} from "redux/reducers/LoginSlice";
import {useNavigate} from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import {useForm, Controller} from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import {CgSpinner} from "react-icons/cg";
import instance from "../utils/config/instance";
import {HiEyeSlash} from "react-icons/hi2";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";

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
    // useEffect(() => {
    //     async function check() {
    //         const res = await instance("/api/v1/security", "GET");
    //         if (!res.error) {
    //             navigate("/dashboard")
    //         }
    //     }
    //
    //     check()
    // }, [])
    return (
        // <div className='Father-Login'>
        //     <ToastContainer/>
        //     <div className='Login-box'>
        //         <div>
        //             <img
        //                 className='shiftLogo'
        //                 src={shiftLogo}
        //                 width={100}
        //                 height={100}
        //                 alt=''
        //             />
        //         </div>
        //         <div className='body'>
        //             <div>
        //                 <p className='information'>
        //                     We improve the process-your distribution
        //                 </p>
        //             </div>
        //             <form onSubmit={handleSubmit(loginUser)}>
        //                 <div>
        //                     <Controller
        //                         name='phone'
        //                         control={control}
        //                         defaultValue='+998'
        //                         rules={{required: "Phone Number is required"}}
        //                         render={({field}) => (
        //                             <div className='my-3 '>
        //                                 <PhoneInput
        //                                     {...field}
        //                                     defaultCountry='UZ'
        //                                     limitMaxLength={true}
        //                                     placeholder='+998'
        //                                 />
        //                                 {errors.phone && (
        //                                     <p className='error-message'>{errors.phone.message}!</p>
        //                                 )}
        //                             </div>
        //                         )}
        //                     />
        //
        //                     <Controller
        //                         name='password'
        //                         control={control}
        //                         defaultValue=''
        //                         rules={{required: "Password is required"}}
        //                         render={({field}) => (
        //                             <div className='my-3 d-flex input-group align-items-center'>
        //                                 <input
        //                                     {...field}
        //                                     placeholder='Password'
        //                                     type={showPassword ? 'text' : 'password'}
        //                                     className='form-control my-1'
        //                                 />
        //                                 <button
        //                                     className='btn btn-outline-secondary h-75'
        //                                     type='button'
        //                                     onClick={handleTogglePassword}
        //                                 >
        //                                     <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
        //                                 </button>
        //                                 {errors.password && (
        //                                     <p className='error-message'>
        //                                         {errors.password.message}!
        //                                     </p>
        //                                 )}
        //                             </div>
        //                         )}
        //                     />
        //                     <div>
        //                         <p className='information'>Shift Academy</p>
        //                     </div>
        //
        //                     <div className='d-flex justify-content-start align-items-center my-2'>
        //                         <label className='ml-2'>
        //                             <Controller
        //                                 name='rememberMe'
        //                                 control={control}
        //                                 defaultValue={false}
        //                                 render={({field}) => (
        //                                     <>
        //                                         <input {...field} type='checkbox'/>
        //                                         Remember me
        //                                     </>
        //                                 )}
        //                             />
        //                         </label>
        //                     </div>
        //
        //                     <button
        //                         className='border w-100'
        //                         type='submit'
        //                         disabled={isLoading}
        //                     >
        //                         {isLoading ? (
        //                             <CgSpinner className='animate-spin' size={30}/>
        //                         ) : (
        //                             "Login"
        //                         )}
        //                     </button>
        //                     <hr/>
        //                     <div className='Support-service'>
        //                         <p>Support service: +998 94 121-00-41</p>
        //                     </div>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>

        <section className="bg-gray-50 dark:bg-gray-900">
            <ToastContainer/>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(loginUser)}>
                            <div>
                                <label htmlFor="phone"
                                       className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Phone</label>
                                <Controller
                                    name='phone'
                                    control={control}
                                    defaultValue='+998'
                                    rules={{required: "Phone Number is required"}}
                                    render={({field}) => (
                                        <div>
                                            <PhoneInput
                                                id={"phone"}
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
                            </div>
                            <div>
                                <label htmlFor="password"
                                       className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <Controller
                                    name='password'
                                    control={control}
                                    defaultValue=''
                                    rules={{required: "Password is required"}}
                                    render={({field}) => (
                                        <div className=' d-flex input-group align-items-center'>
                                            <input
                                                {...field}
                                                id={"password"}
                                                placeholder="••••••••"
                                                type={showPassword ? 'text' : 'password'}
                                                className='form-control my-1'

                                            />
                                            <button
                                                className='btn bg-gray-300 border  h-[40px]'
                                                type='button'
                                                onClick={handleTogglePassword}
                                            >
                                                {
                                                    showPassword ? <AiOutlineEye color={"black"}/> :
                                                        <AiOutlineEyeInvisible color={"black"}/>
                                                }
                                            </button>
                                        </div>

                                    )}

                                />
                                {errors.password && (
                                    <p className='error-message'>
                                        {errors.password.message}!
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <Controller
                                            name='rememberMe'
                                            control={control}
                                            defaultValue={false}
                                            render={({field}) => (
                                                <>
                                                    <input {...field}
                                                           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                           id={"rememberMe"}
                                                           type='checkbox'/>
                                                </>
                                            )}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="rememberMe" className="text-gray-500 dark:text-gray-300">Remember
                                            me</label>
                                    </div>
                                </div>
                            </div>
                            <button type="submit"
                                    className="w-full text-white bg-blue-600  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                {isLoading ? (
                                    <div className={"d-flex justify-center"}>
                                        <CgSpinner className='animate-spin' size={25}/>
                                    </div>
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Index;
