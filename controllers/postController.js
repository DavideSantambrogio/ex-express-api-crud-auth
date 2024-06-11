const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');
const prisma = new PrismaClient();

// Function to generate a unique slug
const generateUniqueSlug = async (title) => {
    let slug = slugify(title, { lower: true, strict: true });
    let uniqueSlug = slug;
    let count = 1;

    while (await prisma.post.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${count}`;
        count++;
    }

    return uniqueSlug;
};

// Create a new post
exports.createPost = async (req, res) => {
    const { title, image, content, published, categoryId, tagIds } = req.body;
    try {
        const slug = await generateUniqueSlug(title);
        const tagIdsArray = Array.isArray(tagIds) ? tagIds : [];
        
        const post = await prisma.post.create({
            data: {
                title,
                slug,
                image,
                content,
                published,
                ...(categoryId && { category: { connect: { id: categoryId } } }),
                tags: {
                    connect: tagIdsArray.map(id => ({ id }))
                }
            },
            include: {
                category: true,
                tags: true
            }
        });
        res.status(201).json(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post', details: error.message });
    }
};

// Fetch a post by its slug
exports.getPostBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                category: true,
                tags: true
            }
        });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Fetch all posts with pagination and filter options
exports.getPosts = async (req, res) => {
    try {
        const where = {};
        const { published, page = 1, pageSize = 50, searchTerm } = req.query;
        
        if (published !== undefined) {
            where.published = published === 'true';
        }
        
        const offset = (page - 1) * pageSize;
        const totalItems = await prisma.post.count({ where });
        const totalPages = Math.ceil(totalItems / pageSize);
        
        if (page > totalPages) {
            throw new Error('Requested page does not exist.');
        }
        
        const posts = await prisma.post.findMany({
            where,
            include: {
                category: true,
                tags: true
            },
            take: parseInt(pageSize),
            skip: parseInt(offset)
        });

        res.json({
            data: posts,
            page: page,
            totalItems: totalItems,
            totalPages: totalPages
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a post by its slug
exports.updatePostBySlug = async (req, res) => {
    const { slug } = req.params;
    const { title, image, content, published } = req.body;
    try {
        const newSlug = await generateUniqueSlug(title);
        const post = await prisma.post.update({
            where: { slug },
            data: {
                title,
                slug: newSlug,
                image,
                content,
                published,
            },
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Delete a post by its slug
exports.deletePostBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        await prisma.post.delete({
            where: { slug },
        });
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
