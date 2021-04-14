import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
    modelName,
    validationSchema
} from '../orders/schema';
import Form from '../../__components/helpers/FormikNew';

import FieldSubmitButton from '../../__components/fields/FieldSubmitButton';
import FieldText from '../../__components/fields/FieldText';

import {
    Grid12 as LayoutView,
} from '../../__views/LayoutView';

const Item = ({ item, add, setActive }) => {

    const theme = useTheme();

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        add(newItem);
        setActive(false);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <FieldText
                    modelName={modelName}
                    name={'address'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                    onSubmit={props.handleSubmit} // for FieldTextWithSubmit
                />,
                <FieldSubmitButton
                    label={theme.props.components.MakeOrder}
                    modelName={modelName}
                    onClick={props.handleSubmit}
                />
            ]
            }
        />
        }
    </Form>
};

export default Item;