import * as Yup from 'yup';

export const modelName = 'message';

export const validationSchema = Yup.object().shape({

    text: Yup.string()
        .min(1, 'Must be 1 characters or more!')
        .max(350, 'Too Long!')
        .required('Required'),
    
});