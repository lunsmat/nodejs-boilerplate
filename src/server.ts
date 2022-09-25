import app from './app';

const server = app.listen(3000, () => {
    console.log(`🚀 Server is running on port ${Object(server.address()).port}`);
});
