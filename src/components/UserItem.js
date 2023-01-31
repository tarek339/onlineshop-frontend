import React from "react";
import { Card, Typography, CardContent } from "@mui/material";

export default function UserItem({name, email}) {
    return(
        <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography 
            variant="h5" 
            component="div"
            gutterBottom 
            >
            {name}
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary"
            >
            {email}
          </Typography>
        </CardContent>
      </Card>
    )
}