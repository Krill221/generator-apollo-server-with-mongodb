import React, {
    useContext
} from 'react';
import { AuthContext } from '../../__providers/authProvider';
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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
import {
    //Table as ItemsView,
    //Grid as ItemsView,
    Grid12 as ItemsView,
    //List as ItemsView,
} from '../../__views/ItemsView';
import {
    //ItemTable as ItemView,
    ItemCard as ItemView,
    //ItemList as ItemView,
} from '../../__views/ItemView';
import { ItemsComponent } from '../../__components/itemsComponent';

import InlineForm from '../cartitems/__inlineForm';
import InlineForm2 from '../cartitems/__inlineForm2';
import DeleteForm from '../cartitems/__deleteForm';
import qOrderItems from '../../queries/orderitems.js';
import { Typography } from '@material-ui/core';
import { useSumHook } from '../../__components/estimeComponent';


const Item = ({ item, add, setActive }) => {

    const theme = useTheme();
    const { user } = useContext(AuthContext);
    const itemsSum = useSumHook(qOrderItems, { orderId: item.id, userId: user?.id }, ['value', 'productId.price'], 'multiply');
    let history = useHistory();

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        add(newItem);
        setActive(false);
        history.push(`/delivery`);

    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <ItemsComponent
                    query={qOrderItems}
                    parentObjects={{ orderId: item.id, userId: user?.id }}
                    ItemsView={ItemsView}
                    ItemView={ItemView}
                    EditForm={null}
                    InlineForm={InlineForm}
                    InlineForm2={InlineForm2}
                    TableForm={null}
                    DeleteForm={DeleteForm}
                    options={{
                        inline: true,
                        editable: false,
                        deletable: true
                    }}
                />,
                <br />,
                <Typography variant="h5" component="h2">
                    Total: ${itemsSum}
                </Typography>,
                <FieldText
                    modelName={modelName}
                    name={'address'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                    onSubmit={props.handleSubmit} // for FieldTextWithSubmit
                />,
                <FieldSubmitButton
                    label={theme.props.components.ToPay}
                    modelName={modelName}
                    onClick={props.handleSubmit}
                />,
                <br />
            ]
            }
        />
        }
    </Form>
};

export default Item;