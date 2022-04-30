import {useState, useEffect, useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {TextField, FormControl, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom'
import {ReqOTP, Sign, startLoading} from "../../../Store/Slice/Panel/account.slice";
import axios from "axios";
import {AuthenticationContext} from "../../../AuthenticationContext";

export default function SignFormComponent() {
    const { setUserInfo } = useContext(AuthenticationContext);
    const {loading = false, data = {}} = useSelector(state => state.panel.panelAccount);
    const [activeStep, setActiveStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [errorData, setErrorData] = useState({});
    const [newDate, setNewDate] = useState(new Date().getTime());
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation('translate');
    useEffect(() => {
        if (activeStep === 1 && data['errorCode'] === 0) {
            setActiveStep(2);

        } else if (activeStep === 2 && (data['errorCode'] === 0 || !data['errorCode'])) {
            if (data?.userNames?.length) {
                setFormData({
                    ...formData,
                    userNames: data.userNames
                });
            } else {
                // setFormData({
                //     ...formData,
                //     userName:data.userName
                // });
                handleSubmitStepTree(null, data.userName)
            }

            setActiveStep(3);
        } else if (activeStep === 3 && (data['errorCode'] === 0 || !data['errorCode'])) {
            // navigate("/");
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    useEffect(() => {
        if (activeStep === 1 && !loading) {
            setNewDate(new Date().getTime())

        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);


    const handleSubmitStepOne = (event) => {
        event.preventDefault();

        let errorData = validateAndSave(['cellPhoneNo', 'captcha'], formData);
        if (!Object.keys(errorData).length) {
            dispatch(startLoading());
            dispatch(ReqOTP({
                cellPhoneNo: formData['cellPhoneNo'],
                captcha: formData['captcha']
            }));
        } else {
            setErrorData(errorData);
        }


    };
    const handleSubmitStepTwo = (event) => {
        event.preventDefault();

        let errorData = validateAndSave(['cellPhoneNo', 'password'], formData);
        if (!Object.keys(errorData).length) {
            dispatch(startLoading());
            dispatch(Sign({
                cellPhoneNo: formData['cellPhoneNo'],
                password: formData['password']
            }));
        } else {
            setErrorData(errorData);
        }
    };
    const handleSubmitStepTree = async (event, userName) => {
        if (event)
            event.preventDefault();
        let errorData = {};
        if (!userName) {
            errorData = validateAndSave(['cellPhoneNo', 'password', 'userName'], formData);
        } else {
            errorData = validateAndSave(['cellPhoneNo', 'password'], formData);
        }


        if (!Object.keys(errorData).length) {
            // dispatch(startLoading());
            // dispatch(Sign({
            //     cellPhoneNo: formData['cellPhoneNo'],
            //     password: formData['password'],
            //     userName: formData['userName']
            // }));
            try {
                const {data} = await axios.post(
                    `/ws/account/sign`
                    , {
                        cellPhoneNo: formData['cellPhoneNo'],
                        password: formData['password'],
                        userName: userName || formData['userName']
                    });

                setUserInfo(data || {});
            } catch (e) {
            }

        } else {
            setErrorData(errorData);
        }
    };

    const validateAndSave = (validateList = [], formData = {}) => {
        let errors = {};
        validateList.forEach(parameter => {
            let error = validateValue(parameter, formData, 'validateAll');
            if (error) {
                errors[parameter] = error
            }

        });
        return errors
    };
    const changeValue = (e, parameter) => {
        let value = e.target.value;
        if (parameter === 'cellPhoneNo' || parameter === 'password') {
            if (!value.startsWith('0') && value && parameter === 'cellPhoneNo') {
                value = '0' + value;
            }
            value = value.replace(/[^0-9\d]/ig, "");
        }
        const data = {
            ...formData,
            [parameter]: value
        };
        let errors = errorData;
        Reflect.deleteProperty(errors, parameter);
        setErrorData(errors);
        setFormData(data);
    };
    const validateValue = (parameter, formData, position) => {
        if (!formData[parameter]) {
            const errors = {
                ...errorData,
                [parameter]: t('is_require')
            };
            if (position === 'validateAll') {
                return errors[parameter];
            } else {
                setErrorData(errors);
            }

        }
    };

    const step = () => {
        switch (activeStep) {
            case 1:
                return stepOne();
            case 2:
                return stepTwo();
            case 3:
                return stepTree();
            default:
                return null

        }
    };
    const stepTree = () => {
        return (
            <Box component="form" noValidate onSubmit={handleSubmitStepTree} sx={{mt: 1}}>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={e => setFormData({
                            ...formData,
                            userName: e.target.value
                        })}
                    >
                        {formData?.userNames?.map(username => <FormControlLabel key={username} value={username}
                                                                                 control={<Radio/>} label={username}/>)}
                    </RadioGroup>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {t('enter')}
                </Button>
            </Box>
        )
    };
    const stepTwo = () => {
        return (
            <Box component="form" noValidate onSubmit={handleSubmitStepTwo} sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formData['password'] || ''}
                    error={!!errorData['password'] || false}
                    inputProps={{inputMode: 'numric', min: 0, maxLength: 6}}
                    helperText={errorData['password'] || ''}
                    onChange={e => changeValue(e, 'password')}
                    onBlur={() => validateValue('password', formData)}
                    id="cellPhoneNo"
                    label={t('otp')}
                    name="password"
                    autoComplete="password"
                    autoFocus
                    className={'ltr-data'}
                />
                <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {t('confirmOtm')}
                </Button>
            </Box>
        )
    };
    const stepOne = () => {
        return (
            <Box component="form" noValidate onSubmit={handleSubmitStepOne} sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={formData['cellPhoneNo'] || ''}
                    error={!!errorData['cellPhoneNo'] || false}
                    inputProps={{inputMode: 'numric', min: 0, maxLength: 11}}
                    helperText={errorData['cellPhoneNo'] || ''}
                    onChange={e => changeValue(e, 'cellPhoneNo')}
                    onBlur={() => validateValue('cellPhoneNo', formData)}
                    id="cellPhoneNo"
                    label={t('cellPhoneNo')}
                    name="cellPhoneNo"
                    autoComplete="cellPhoneNo"
                    autoFocus
                    className={'ltr-data'}
                />

                <Grid container alignItems={'center'} justifyContent={'center'} style={{height: 60}}>
                    <Grid item>
                        {
                            !loading && <img src={`/ws/account/captcha?_v=${newDate}`} alt={t('siteName')}/>
                        }

                    </Grid>
                </Grid>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="captcha"
                    value={formData['captcha'] || ''}
                    error={!!errorData['captcha'] || false}
                    helperText={errorData['captcha'] || ''}
                    onChange={e => changeValue(e, 'captcha')}
                    onBlur={() => validateValue('captcha', formData)}
                    label={t('captcha')}
                    type="text"
                    id="captcha"
                    autoComplete="captcha"
                    className={'ltr-data'}
                />
                <Button
                    type="submit"
                    fullWidth
                    disabled={loading}
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    {t('getCode')}
                </Button>
            </Box>
        )
    };

    return step();
}

