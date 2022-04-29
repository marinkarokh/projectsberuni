import { CardContent, Typography } from "@mui/material"



const Main = () => {

	

	return (
		<>
			<Typography textAlign="center" variant="h1">Добро пожаловать</Typography>
			<hr />
			<CardContent
					sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}>
  			<a href="/signin">Войти</a>
				<tr />
				<a href="/signUp">Зарегистрироваться</a>
      </CardContent>
		</>
	)
}


export default Main