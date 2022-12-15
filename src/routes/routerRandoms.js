import { Router } from "express";
import { fork } from 'child_process'

const router = Router();

function numeroRandom() {
     const array = [];
    for (let i = 0; i < 10000; i++) {
        array.push(Math.floor(Math.random() *10 ))
    }
    return array
}
router.get('/randoms-nodebug', (req, res) => {
   const resultado = numeroRandom();
   res.json({random: resultado});
})

router.get('/randoms-debug', (req, res ) => {
    const resultado = numeroRandom();
    console.log(resultado);
    res.json({random: resultado});
})

export default router