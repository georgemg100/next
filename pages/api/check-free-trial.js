import prisma from '../../lib/prisma'

// Simple endpoint to check if free trial/use is available
// Does not require authentication
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Get count of users with active trials
    // const activeTrialCount = await prisma.user.count({
    //   where: {
    //     trial: {
    //       active: true
    //     }
    //   }
    // })

    // Check if below maximum allowed trials (e.g. 100)
    const MAX_CONCURRENT_TRIALS = 100
    const isFreeUseAvailable = false//activeTrialCount < MAX_CONCURRENT_TRIALS

    // Return simple boolean response
    if(isFreeUseAvailable) {
      return res.status(200).json({ available: isFreeUseAvailable })
    } else {
      return res.status(200).json({ available: isFreeUseAvailable, message: "Please update your npm package to continue use" })
    }
    
  } catch (error) {
    console.error('Error checking free trial availability:', error)
    return res.status(500).json({ message: 'Error checking free trial availability' })
  }
}
