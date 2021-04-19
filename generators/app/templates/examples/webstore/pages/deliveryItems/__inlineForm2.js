import React from 'react';
//import { useTheme } from '@material-ui/core/styles';
import Form from '../../__components/helpers/FormikEdit';
//import FieldText from '../../__components/fields/FieldText';
import {
    //modelName,
    validationSchema
} from '../orderitems/schema';
import {
    //Chat as LayoutView,
    //Grid12 as LayoutView,
    Raw as LayoutView,
    //Simple as LayoutView,
    //Tabs as LayoutView,
    //Wizard as LayoutView,
} from '../../__views/LayoutView';

const Item = ({ item, isNew, update, setActive }) => {

    //const theme = useTheme();

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        update(newItem);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={['']
            }
        />
        }
    </Form>
};

export default Item;