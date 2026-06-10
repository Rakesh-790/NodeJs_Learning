const validate = (Schema) => {
    return (req, res, next) => {
        const result = Schema.safeParse(req.body);

        if (!result.success) {
            const error = result.error.issues.map(
                issue => issue.message
            );

            return res.status(400).json({
                success: false,
                error
            });
        };

        req.body = result.data;

        next();
    };
};

module.exports = validate;