import React from 'react';
import {
    validationSchema
} from '../products/schema';
import Form from '../../__components/helpers/FormikEdit';

import {
    Grid12 as LayoutView,
} from '../../__views/LayoutView';


import ShowImages from '../../__components/fields/ShowImages';
import { Typography } from '@material-ui/core';

const Item = ({ item, isNew, update, setActive }) => {

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        update(newItem);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <ShowImages
                    height={null}
                    card={true}
                    images={[item.pic]}
                />,
                <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                </Typography>,
                <Typography variant="body2" color="textSecondary" component="p" >
                    {item.desc}
                </Typography>,
                <Typography variant="h5" component="h2">
                    $ {item.price}
                </Typography>,

            ]
            }
        />
        }
    </Form>
};

export default Item;