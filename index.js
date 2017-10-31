const spawn = require('child_process').spawn;

const processShadow = function(command)
{
    const options =
        {
            detached: false,
            stdio: 'inherit'
        }
    let alive = true


    let shadow
    try
    {
        shadow = spawn(command, [], options)
    }
    catch(e)
    {
        console.log(e)
    }

    shadow.on('exit', function (code, signal)
    {
        alive = false
        console.log(`child process exited, exit code: ${code}, signal: ${signal}`);
    });

    process.on('exit', function()
    {
        console.log(`main process start to shutdown`)

        if(alive)
        {
            try
            {
                console.log(`about to send sigterm signal to child process...`)
                shadow.kill(shadow.pid)
                console.log(`done`)
            }
            catch(e)
            {
                console.log(e)
            }
        }

        setTimeout(function()
        {
            if(shadow.killed)
            {
                console.log(`child process killed by signal`)
            }
            else
            {
                console.log(`failed to kill child process by signal sigterm`)
                throw new Error('failed to kill the child process by sending signal sigterm')
            }
        }, 2000)

        console.log(`main process is shutting down...done`)
    });

    return shadow
}

module.exports = processShadow