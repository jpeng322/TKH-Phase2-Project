import express from "express"
import prisma from "../db/index.js"

const router = express.Router()

//getting all the pets/posts
router.get("/", async (request, response) => {
    try {
        const allPets = await prisma.pet.findMany({
            // where: {
            //     name: request.body.name,
            //     species: request.body.species
            // }
        })

        if (allPets) {
            response.status(200).json({
                success: true,
                message: "all pets fetched!",
                pet: allPets
            })
        } else {
            response.status(400).json({
                success: false,
                message: "Something went wrong!"
            })
        }
    } catch (error) {
        console.log(error)
        response.status(400).json({
            success: false,
            message: "could not get any pet data!"
        })
    }
})

//getting pets by id
router.get("/:petId", async (request, response) => {
    console.log(request.params.petId);
    try {
        const getPetsbyId = await prisma.pet.findFirst({
            where: {
                id: parseInt(request.params.petId)
            }
        })

        if (getPetsbyId) {
            response.status(200).json({
                success: true,
                message: "successfully fetched pet by id!",
                pet: getPetsbyId
            })
        } else {
            response.status(400).json({
                success: false,
                message: "something went wrong, could not fetch data"
            })
        }
    } catch (error) {
        console.log(error)
        response.status(400).json({
            success: false,
            message: "Something went wrong, sorry!"
        })
    }
})


router.post("/", async (request, response) => {
    // console.log(request.user)
    // console.log(typeof request.user.id)
    try {
        const newPet = await prisma.pet.create({
            data: {
                name: request.body.name,
                species: request.body.species,
                userId: request.user.id
            }
        })

        if (newPet) {
            response.status(201).json({
                success: true,
                message: "Pet created",
                pet: newPet
            })
        } else {
            response.status(400).json({
                success: false,
                message: "Pet was not created"
            })
        }
    } catch (e) {
        console.log(e)
        response.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
})

router.put("/:petId", async (request, response) => {
    // console.log(request.params.id, typeof request.params.id, request.user.id, typeof request.user.id)
    try {
        const updatePet = await prisma.pet.updateMany({
            where: {
                userId: request.user.id,
                id: parseInt(request.params.petId)
            },
            data: {
                name: request.body.name,
                species: request.body.species
            },
        })

        if (updatePet) {
            response.status(200).json({
                success: true,
                message: "Pet information was updated",
            })
        } else {
            response.status(400).json({
                success:false,
                message: "Pet not updated. Something failed."
            })
        }
    } catch (err) {
        console.log(err)
        response.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
})

export default router