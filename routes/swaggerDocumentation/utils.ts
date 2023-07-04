/**
 * @swagger
 * components:
 *   schemas:
 *     Filter:
 *       type: object
 *       properties:
 *         where:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *         limit:
 *           type: integer
 *         select:
 *           type: array
 *           items:
 *             type: string
 *         order:
 *           type: object
 *           properties:
 *             createdOn:
 *               type: string
 *         offset:
 *           type: integer
 *     SuccessMessage:
 *         type: object
 *         properties:
 *           message:
 *             type: string
 *             example: Successfully created
 *     LinksSchema:
 *       type: object
 *       properties:
 *         first:
 *           type: string
 *           format: uri
 *         previous:
 *           type: string
 *           format: uri
 *           nullable: true
 *         next:
 *           type: string
 *           format: uri
 *           nullable: true
 *         last:
 *           type: string
 *           format: uri
 *     MetaSchema:
 *       type: object
 *       properties:
 *         itemCount:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         currentPage:
 *           type: integer
 *     PaginationError:
 *       properties:
 *         message:
 *          type: string
 *          example: In order to paginate you need to send at least limit and offset
 *     UnprocessableEntity:
 *        type: object
 *        properties:
 *          errors:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                type:
 *                  type: string
 *                  example: field
 *                value:
 *                  type: string
 *                  example: a string
 *                msg:
 *                  type: string
 *                  example: id must be a numeric value
 *                path:
 *                  type: string
 *                  example: id
 *                location:
 *                  type: string
 *                  example: params
 */
