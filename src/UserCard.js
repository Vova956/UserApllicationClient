import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as React from 'react';

function UserCard(props) {

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar alt={props.name}  src={props.photo}></Avatar>
                    }
                    
                    title={props.name}
                    subheader={`ID : ${props.id}`}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Phone number : {props.phone}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Email : {props.email}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Position : {props.position}
                    </Typography>
                    
                </CardContent>
            </Card>
        </div>
    )

}

UserCard.defaultProps = {
    id: "0"
}

export default UserCard