import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import DnDFlow from "./right/GraphCreator"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    }
}))

const CreateStrategy = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper} component="form">
                        
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.paper} component="form">
                        <DnDFlow/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateStrategy

