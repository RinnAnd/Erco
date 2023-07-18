export const getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll()
    } catch (error) {
        
    }
}